export const emulateRequest = async <T extends object | Error | unknown[]>(
    delay = 1000,
    succesfullRequest = true,
    mockData?: T
): Promise<T | undefined> => {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (succesfullRequest) resolve(mockData);

            reject(new Error('Request emulater failed'));
        }, delay);
    });
};
