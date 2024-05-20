import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../utils/fetchApi'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../redux/auhSlice'
import { formValidation } from '../utils/validation'
import ErrorMessage from '../components/ErrorMessage'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [dob, setDob] = useState('')
    const initFormData = {
        email: '',
        dob,
        newPassword: '',
        confirmPassword: ''
    }
    const [formData, setFormData] = useState(initFormData);
    const [errorObj, setErrorObj] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const handleFormChange = (field, value) => {
        const updatedFormData = { ...formData };
        if (field === 'dob') {
            updatedFormData[field] = formatDate(value);
        } else {
            updatedFormData[field] = value;
        }
        setFormData(updatedFormData);
    };


    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!formData) return
        let errorMessage = {};
        let key = 'forgotpassword'
        try {
            formValidation(formData, errorMessage, key)
            if (Object.keys(errorMessage)?.length === 0) {
                const options = {
                    'Content-Type': 'application/json',
                };
                const data = await request('/auth/forgot-password', "POST", options, formData)
                if (data.success === true) {
                    dispatch(forgotPassword(data))
                    navigate('/')
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }
            } else {
                setErrorObj(errorMessage);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <section className="bg-gray-300">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1510511459019-5dda7724fd87"
                            className="absolute inset-0 h-full w-full object-contain opacity-80"
                        />

                        <div className="hidden lg:relative lg:block lg:p-12">
                            <Link className="block text-white" href="#">
                                <span className="sr-only">Home</span>
                            </Link>

                            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                Welcome to User Grid
                            </h2>

                            <p className="mt-4 leading-relaxed text-white/90">
                                Powered by GrofleX
                            </p>
                        </div>
                    </section>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <Link
                                    className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                                    href="#"
                                >
                                    <span className="sr-only">Home</span>
                                </Link>

                                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                    Welcome to Squid 🦑
                                </h1>

                                <p className="mt-4 leading-relaxed text-gray-500">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                    quibusdam aperiam voluptatum.
                                </p>
                            </div>

                            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData['email']}
                                        placeholder={"Enter email"}
                                        onChange={(e) => { handleFormChange('email', e.target.value) }}
                                        className="mt-1 w-full outline-none h-[2.5rem] p-5 rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.email} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Date Of Birth
                                    </label>

                                    <input
                                        type="date"
                                        value={dob}
                                        placeholder={"Enter dob"}
                                        onChange={(e) => setDob(e.target.value)}
                                        className="mt-1 w-full outline-none h-[2.5rem] p-5 rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.dob} />
                                </div>
                                <div className="relative col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        value={formData['newPassword']}
                                        placeholder={"Enter new passowrd"}
                                        onChange={(e) => { handleFormChange('newPassword', e.target.value) }}
                                        className="mt-1 w-full outline-none h-[2.5rem] p-5 rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.newPassword} />
                                </div>
                                <div className="relative col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData['confirmPassword']}
                                        placeholder={"Confirm passowrd"}
                                        onChange={(e) => { handleFormChange('confirmPassword', e.target.value) }}
                                        className="mt-1 w-full outline-none h-[2.5rem] p-5 rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.confirmPassword} />
                                    <div className='absolute top-[2rem] right-[1rem]'>{showPassword ? <RemoveRedEyeIcon onClick={() => setShowPassword(!showPassword)} /> : <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} />}</div>
                                </div>
                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        onClick={handleForgotPassword}
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    >
                                        Reset
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?
                                        <Link to="/login" className="text-gray-700 underline">Log in</Link>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}

export default ForgotPassword