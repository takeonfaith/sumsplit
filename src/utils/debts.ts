import type { Expense, EventParticipant, Debt } from '@/types';
import { convertCurrency } from '@/services/currency';

export async function calculateDebts(
  expenses: Expense[],
  participants: EventParticipant[],
  baseCurrency: string
): Promise<Debt[]> {
  const debts: Map<string, Map<string, number>> = new Map();

  // Инициализация карты долгов
  participants.forEach((p) => {
    debts.set(p.id, new Map());
    participants.forEach((p2) => {
      if (p.id !== p2.id) {
        debts.get(p.id)!.set(p2.id, 0);
      }
    });
  });

  // Расчет долгов для каждой траты
  for (const expense of expenses) {
    const paidBy = expense.paidBy;
    const paidByMap = debts.get(paidBy);

    if (!paidByMap) continue;

    // Конвертация в базовую валюту
    for (const item of expense.items) {
      const itemAmountInBase = await convertCurrency(
        item.amount,
        item.currency,
        baseCurrency
      );

      // Распределение суммы между участниками
      for (const distribution of item.distribution) {
        const participantDebt = itemAmountInBase * (distribution.percentage / 100);
        const participantMap = debts.get(distribution.participantId);

        if (participantMap && distribution.participantId !== paidBy) {
          // Увеличиваем долг участника перед плательщиком
          const currentDebt = participantMap.get(paidBy) || 0;
          participantMap.set(paidBy, currentDebt + participantDebt);

          // Уменьшаем долг плательщика перед участником (или увеличиваем обратный долг)
          const currentReverseDebt = paidByMap.get(distribution.participantId) || 0;
          paidByMap.set(distribution.participantId, currentReverseDebt - participantDebt);
        }
      }
    }
  }

  // Преобразование в массив долгов
  const result: Debt[] = [];
  debts.forEach((participantDebts, fromId) => {
    participantDebts.forEach((amount, toId) => {
      if (amount > 0.01) {
        // Игнорируем очень маленькие суммы
        result.push({
          from: fromId,
          to: toId,
          amount,
          currency: baseCurrency,
        });
      }
    });
  });

  return optimizeDebts(result);
}

export function optimizeDebts(debts: Debt[]): Debt[] {
  const netAmounts: Map<string, number> = new Map();

  // Расчет чистых сумм для каждого участника
  debts.forEach((debt) => {
    const fromNet = (netAmounts.get(debt.from) || 0) - debt.amount;
    const toNet = (netAmounts.get(debt.to) || 0) + debt.amount;
    netAmounts.set(debt.from, fromNet);
    netAmounts.set(debt.to, toNet);
  });

  // Создание оптимизированного списка долгов
  const optimized: Debt[] = [];
  const participants = Array.from(netAmounts.keys());
  const sortedParticipants = participants.sort((a, b) => {
    const aNet = netAmounts.get(a) || 0;
    const bNet = netAmounts.get(b) || 0;
    return aNet - bNet;
  });

  let i = 0;
  let j = sortedParticipants.length - 1;

  while (i < j) {
    const debtor = sortedParticipants[i];
    const creditor = sortedParticipants[j];
    const debtorNet = netAmounts.get(debtor) || 0;
    const creditorNet = netAmounts.get(creditor) || 0;

    if (Math.abs(debtorNet) < 0.01) {
      i++;
      continue;
    }
    if (Math.abs(creditorNet) < 0.01) {
      j--;
      continue;
    }

    const amount = Math.min(Math.abs(debtorNet), creditorNet);
    optimized.push({
      from: debtor,
      to: creditor,
      amount,
      currency: debts[0]?.currency || 'USD',
    });

    netAmounts.set(debtor, debtorNet + amount);
    netAmounts.set(creditor, creditorNet - amount);

    if (Math.abs(netAmounts.get(debtor) || 0) < 0.01) i++;
    if (Math.abs(netAmounts.get(creditor) || 0) < 0.01) j--;
  }

  return optimized;
}

