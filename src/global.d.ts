declare global {
    declare const __brand: unique symbol;
    type Brand<B> = { [__brand]: B };
    export type Branded<T, B> = T & Brand<B>;

    type TSize = 's' | 'm' | 'l';

    type Evt<
        T extends 'btn' | 'div' | 'a' | 'input' | 'textarea' | 'form' | 'label'
    > = T extends 'btn'
        ? React.MouseEvent<HTMLButtonElement, MouseEvent>
        : T extends 'div'
        ? React.MouseEvent<HTMLDivElement, MouseEvent>
        : T extends 'a'
        ? React.MouseEvent<HTMLAnchorElement, MouseEvent>
        : T extends 'input'
        ? React.ChangeEvent<HTMLInputElement>
        : T extends 'textarea'
        ? React.ChangeEvent<HTMLTextAreaElement>
        : T extends 'label'
        ? React.MouseEvent<HTMLLabelElement, MouseEvent>
        : T extends 'form'
        ? React.DragEvent<HTMLFormElement>
        : never;
}

export {};
