import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <Form
                method="post"
                action={route('register')}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="username"
                                    name="username"
                                    placeholder="Username"
                                    error={!!errors.username}
                                />
                                <InputError message={errors.username} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    error={!!errors.email}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    error={!!errors.password}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    error={!!errors.password}
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            {/* add dob input */}
                            <div className="grid gap-2">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input
                                    id="dob"
                                    type="date"
                                    tabIndex={5}
                                    name="dob"
                                    placeholder="YYYY-MM-DD"
                                    error={!!errors.dob}
                                />
                                <InputError message={errors.dob} />
                            </div>
                        </div>

                        {/* add terms checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                id="terms"
                                type="checkbox"
                                tabIndex={6}
                                name="terms"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor="terms" className="text-sm">
                                I agree to the{' '}
                                <TextLink target="_blank">
                                    Terms of Service
                                </TextLink>
                            </Label>
                        </div>

                        <InputError message={errors.terms} className="mt-2" />

                        <div className="flex items-center justify-end">

                            <Button type="submit" className="mt-2 w-full" tabIndex={5}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink href={route('login')} tabIndex={6}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
