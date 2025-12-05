import { loginFx } from '../../entities/user/model/login';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { Loading } from '../../shared/components/loading';
import { createEffectorForm } from '../../shared/effector/form/effector-form';
import {
    InputGroup,
    LoginBlock,
    LoginFormStyled,
    LoginPageStyled,
    LoginPic,
} from './styles';

const { useForm } = createEffectorForm({
    email: {
        required: true,
        type: 'email',
        init: '',
    },
    password: {
        required: true,
        type: 'password',
        init: '',
    },
});

export const LoginPage = () => {
    const { values, handleSubmit, errors, onChange, isSubmitting } = useForm({
        submitForm: async (values) => {
            await loginFx({
                email: values.email,
                password: values.password,
            });
        },
    });

    return (
        <LoginPageStyled>
            <LoginPic>
                <span>SUMSPLITSUMSPLITSUMSPLITSUMSPLIT</span>
            </LoginPic>
            <LoginBlock>
                <LoginFormStyled onSubmit={handleSubmit}>
                    <InputGroup>
                        <Input
                            label="Email"
                            placeholder="Email"
                            type="email"
                            value={values.email}
                            id="email"
                            error={errors.email}
                            onChange={onChange}
                        />
                        <Input
                            label="Пароль"
                            placeholder="Пароль"
                            id="password"
                            type="password"
                            value={values.password}
                            error={errors.password}
                            onChange={onChange}
                        />
                    </InputGroup>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="full primary rounded size-l"
                    >
                        {isSubmitting ? <Loading /> : 'Войти'}
                    </Button>
                </LoginFormStyled>
            </LoginBlock>
        </LoginPageStyled>
    );
};
