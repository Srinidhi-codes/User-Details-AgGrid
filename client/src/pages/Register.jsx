import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from '../components/Dropdown'
import { request } from '../utils/fetchApi'
import { useDispatch } from 'react-redux'
import { register } from '../redux/auhSlice'
import { formValidation } from '../utils/validation'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorMessage from '../components/ErrorMessage'
import toast from 'react-hot-toast'

const Register = () => {
    const initFormData = {
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        email: '',
        areaOfInterest: '',
        password: '',
        city: '',
        country: '',
        state: '',
        zip: '',
        profilePicture: ''
    }
    const [formData, setFormData] = useState(initFormData);
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [allCountryData, setAllCountryData] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [errorObj, setErrorObj] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountryData = async () => {
            const options = {
                'Content-Type': 'application/json',
            };
            try {
                const data = await request('/country', 'GET', options);
                setCountry(data.map(country => country.name));
                setAllCountryData(data);
            } catch (error) {
                toast.error(error);
            }
        };
        fetchCountryData();
    }, []);

    const handleFormChange = (field, value) => {
        const updatedFormData = { ...formData };
        updatedFormData[field] = value;
        setFormData(updatedFormData);

        if (field === 'country') {
            const selectedCountry = allCountryData.find(country => country.name === value);
            setState(selectedCountry ? selectedCountry.states.map(state => state.name) : []);
            setFormData(prevData => ({
                ...prevData,
                state: '',
            }));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!formData) return
        let errorMessage = {};
        let key = 'register'
        try {
            formValidation(formData, errorMessage, key)
            if (Object.keys(errorMessage)?.length === 0) {
                const options = {
                    'Content-Type': 'application/json',
                };
                const data = await request('/auth/register', "POST", options, formData)
                if (data.success === true) {
                    dispatch(register(data))
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
                            src="https://images.unsplash.com/photo-1545987796-200677ee1011"
                            className="absolute inset-0 h-full w-full object-contain opacity-80"
                        />

                        <div className="hidden lg:relative lg:block lg:p-12">
                            <Link className="block text-white" href="#">
                                <span className="sr-only">Home</span>
                                <svg
                                    className="h-8 sm:h-10"
                                    viewBox="0 0 28 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                        fill="currentColor"
                                    />
                                </svg>
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
                                    <svg
                                        className="h-8 sm:h-10"
                                        viewBox="0 0 28 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                            fill="currentColor"
                                        />
                                    </svg>
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
                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        value={formData['firstName']}
                                        placeholder={"Enter first name"}
                                        onChange={(e) => { handleFormChange('firstName', e.target.value) }}
                                        className="mt-1 w-full outline-none h-[2.5rem] p-5 rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.firstName} />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        value={formData['lastName']}
                                        placeholder={"Enter last name"}
                                        onChange={(e) => { handleFormChange('lastName', e.target.value) }}
                                        className="mt-1 w-full outline-none h-[2.5rem] p-5 rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.lastName} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            value="male"
                                            checked={formData.gender === 'male'}
                                            onChange={(e) => handleFormChange('gender', e.target.value)}
                                            className="mr-2"
                                        />
                                        <label htmlFor="male" className="inline-block mr-4">
                                            Male
                                        </label>
                                        <input
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="female"
                                            checked={formData.gender === 'female'}
                                            onChange={(e) => handleFormChange('gender', e.target.value)}
                                            className="mr-2"
                                        />

                                        <label htmlFor="female" className="inline-block">
                                            Female
                                        </label>
                                    </div>
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.gender} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Date Of Birth
                                    </label>

                                    <input
                                        type="date"
                                        value={formData['dob']}
                                        placeholder={"Enter dob"}
                                        onChange={(e) => { handleFormChange('dob', e.target.value) }}
                                        className="mt-1 w-full outline-none h-[2.5rem] p-5 rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.dob} />
                                </div>

                                <div className="col-span-6 sm:col-span-3 mt-4">
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <Dropdown
                                        data={country}
                                        value={formData.country}
                                        placeholder="Enter Country"
                                        onChange={(value) => handleFormChange('country', value)}
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.state} />
                                </div>
                                <div className="col-span-6 sm:col-span-3 mt-4">
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                        State
                                    </label>
                                    <Dropdown
                                        data={state}
                                        value={formData.state}
                                        placeholder="Enter state"
                                        onChange={(value) => handleFormChange('state', value)}
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.state} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        value={formData['city']}
                                        placeholder={"Enter city"}
                                        onChange={(e) => { handleFormChange('city', e.target.value) }}
                                        className="mt-1 w-full outline-none h-[2.5rem] p-5 rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.city} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        value={formData['zip']}
                                        placeholder={"Enter zip"}
                                        onChange={(e) => { handleFormChange('zip', e.target.value) }}
                                        className="mt-1 w-full outline-none h-[2.5rem] p-5 rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.zip} />
                                </div>
                                <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                        Area Of Interest
                                    </label>
                                    <div className="mt-1 flex gap-2">
                                        <input
                                            type="radio"
                                            value='reading'
                                            checked={formData.areaOfInterest === 'reading'}
                                            placeholder={"Enter Area Of Interest"}
                                            onChange={(e) => { handleFormChange('areaOfInterest', e.target.value) }}
                                            className="mr-2"
                                        />
                                        <label htmlFor="male" className="inline-block mr-4">
                                            Reading
                                        </label>
                                        <input
                                            type="radio"
                                            value='writing'
                                            placeholder={"Enter Area Of Interest"}
                                            checked={formData.areaOfInterest === 'writing'}
                                            onChange={(e) => { handleFormChange('areaOfInterest', e.target.value) }}
                                            className="mr-2"
                                        />
                                        <label htmlFor="female" className="inline-block">
                                            Writing
                                        </label>
                                        <input
                                            type="radio"
                                            value='traveling'
                                            placeholder={"Enter Area Of Interest"}
                                            checked={formData.areaOfInterest === 'traveling'}
                                            onChange={(e) => { handleFormChange('areaOfInterest', e.target.value) }}
                                            className="mr-2"
                                        />
                                        <label htmlFor="female" className="inline-block">
                                            Traveling
                                        </label>
                                        <input
                                            type="radio"
                                            value='playing'
                                            placeholder={"Enter Area Of Interest"}
                                            checked={formData.areaOfInterest === 'playing'}
                                            onChange={(e) => { handleFormChange('areaOfInterest', e.target.value) }}
                                            className="mr-2"
                                        />
                                        <label htmlFor="female" className="inline-block">
                                            Playing
                                        </label>
                                    </div>
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.areaOfInterest} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Profile Picture
                                    </label>
                                    <input
                                        type="file"
                                        id="LastName"
                                        name="last_name"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>
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
                                <div className="relative col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData['password']}
                                        placeholder={"Enter password"}
                                        onChange={(e) => { handleFormChange('password', e.target.value) }}
                                        className="mt-1 w-full outline-none h-[2.5rem] p-5 rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <ErrorMessage className="w-[7rem]" value={errorObj?.password} />
                                    <div className='absolute top-[2rem] right-[2rem]'>{showPassword ? <RemoveRedEyeIcon onClick={() => setShowPassword(!showPassword)} /> : <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} />}</div>
                                </div>
                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        onClick={handleRegister}
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    >
                                        Register
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

export default Register