import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { AuthFormSchema } from '@/lib/utils';
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from './CustomInput';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
const AuthForm = ({ type }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(AuthFormSchema(type)),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            postal: "",
            BOD: "",
            ssn: "",
        },
    });

    const { handleSubmit } = form;
    const navigate = useNavigate();

    async function signIn(data) {
        console.log('Submitting Sign In:', data);
        setIsLoading(true);
        const url = '/SMC/auth/sign-in';
        const api = 'http://localhost:9000';

        try {
            const response = await axios.post(`${api}${url}`, {
                email: data.email,
                password: data.password,
            });

            if (response.data.token) {
                await localStore(response.data.user)
                localStorage.setItem('token', response.data.token);


                Cookies.set("token", response.data.token, {expires: 1})
                Cookies.set('user', JSON.stringify(response.data.user))

                setUser(response.data.user);
                navigate('/');
            }else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error during sign in:', error.response?.data?.message || error.message);
            console.error('Error during sign in:', error.response?.data?.message || error.message);
        
        // Show error messages for incorrect credentials
        if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message); // This will show "Wrong Credentials"
        } else {
            toast.error("An unexpected error occurred"); // Generic error message
        }
        } finally {
            setIsLoading(false);
        }
    }

    const localStore = async(data) => {
        await localStorage.setItem("user", JSON.stringify(data))
    }

    async function signUp(data) {
        console.log('Submitting Sign Up:', data);
        setIsLoading(true);
        const url = '/SMC/auth/sign-up';
        const api = 'http://localhost:9000';

        try {
            const response = await axios.post(`${api}${url}`, data);

            if (response.data.token) {
                await localStore(response.data.user)
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                navigate('/sign-in');
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error during sign up:', error.response?.data?.message || error.message);
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit = (data) => {
        if (type === 'sign-in') {
            signIn(data);
        } else {
            signUp(data);
        }
    };

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link to='/' className='cursor-pointer flex items-center gap-1 px-4'>
                    <img src="/icons/logo.svg" alt="" width={34} height={34} />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1"> SMC</h1>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? 'Link Account'
                            : type === 'sign-in'
                                ? 'Sign In'
                                : 'Sign Up'
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user
                                ? "Link your account to get started"
                                : "Please Enter your details"
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* Additional content for linked accounts */}
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-up' && (
                            <>
                                <div className="flex gap-4">
                                    <CustomInput control={form.control} name="firstName" placeholder="Enter your name" label="First Name" />
                                    <CustomInput control={form.control} name="lastName" placeholder="Enter your name" label="Last Name" />
                                </div>
                                <CustomInput control={form.control} name="address" placeholder="Enter your address" label="Address" />
                                <div className="flex gap-4">
                                    <CustomInput control={form.control} name="state" placeholder="ex-ph" label="State" />
                                    <CustomInput control={form.control} name="postal" placeholder="ex-1940" label="Postal Code" />
                                </div>
                                <div className="flex gap-4">
                                    <CustomInput control={form.control} name="BOD" placeholder="ex-YYYY-MM-DD" label="Birth Date" />
                                    <CustomInput control={form.control} name="ssn" placeholder="ex-1234" label="SSN" />
                                </div>
                            </>
                        )}
                        <CustomInput control={form.control} name="email" placeholder="Enter Email" label="Email" />
                        <CustomInput control={form.control} name="password" placeholder="Enter password" label="Password" />
                        <div className="flex flex-col gap-4">
                            <Button type="submit" className="form-btn" disabled={isLoading}>
                                {isLoading
                                    ? <><Loader2 className='animate-spin' size={20} aria-label="Loading" /> &nbsp; Loading...</>
                                    : type === 'sign-in' ? "Sign In" : "Sign Up"
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
            <footer className='flex justify-center gap-1'>
                <p className='text-14 font-normal text-gray-600'>
                    {type === 'sign-in'
                        ? "Don't have an account?"
                        : "Already have an account"
                    }
                </p>
                <Link to={type === 'sign-up' ? '/sign-in' : "/sign-up"} className='form-link'>
                    {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                </Link>
            </footer>
        </section>
    );
};

export default AuthForm;
