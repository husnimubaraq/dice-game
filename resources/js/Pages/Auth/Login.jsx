import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useIsMobile } from '@/Hooks/useMediaQuery';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { twMerge } from 'tailwind-merge';

export default function Login({ status, canResetPassword }) {
    const isMobile = useIsMobile()

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div
            className={twMerge(
                "flex flex-col h-screen w-screen bg-cover bg-bottom",
                isMobile && "h-screen relative"
            )}
            style={{
                backgroundImage: "url('/assets/images/bg-2.jpg')"
            }}
        >
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className='h-full flex flex-col justify-center px-5 relative z-50'>
                <div className='max-w-md flex flex-col mx-auto w-full bg-white p-5 rounded-xl'>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Username" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4 flex items-center justify-end">

                            <PrimaryButton className="ms-4" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <div className="absolute bottom-0 -right-[20%] ">
                <img
                    src="/assets/images/bg-diponegoro.png"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}
