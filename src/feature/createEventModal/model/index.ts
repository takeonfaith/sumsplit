import { createEffectorForm } from '../../../shared/effector/form/effector-form';

export const { useForm } = createEffectorForm({
    name: {
        required: true,
        maxLength: 255,
        type: 'string',
        init: '',
    },
});
