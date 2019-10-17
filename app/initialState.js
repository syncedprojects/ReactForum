const initialState = {
    registerRequested: false,
    registerErrorMessage: '',
    registerSuccessMessage: '',
    loginRequested: false,
    loginErrorMessage: '',
    loginSuccessMessage: '',
    isUserLoggedIn: false,
    logoutErrorMessage: '',
    activeTopicId: null,
    topics: [
        {
            id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
            title: 'Наследование и интерфейс',
            messages: [
                {
                    uid: '5hqi299DwPdNGaY6uiqAKceYzhw1',
                    text: 'Twelve minutes to ignition.',
                    timestamp: '2019-10-01 10:05:40',
                },
                {
                    uid: 'Blvtzc3HdoUKoA66rI3SzRgbUD22',
                    text: 'Let\'s handle the interfacing.',
                    timestamp: '2019-10-02 09:25:15',
                },
            ],
        },
        {
            id: '2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
            title: 'Современный и эффективный С++',
            messages: [],
        },
        {
            id: '3b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
            title: 'Ошибка: Unable to find static library: dclusr.lib',
            messages: [],
        },
        {
            id: '7b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
            title: 'Web development',
            messages: [
                {
                    uid: 'Blvtzc3HdoUKoA66rI3SzRgbUD22',
                    text: 'Lorem ipsum dolor sit amet.',
                    timestamp: '2019-10-11 11:05:40',
                },
                {
                    uid: 'bUtEOIsAYjZBK2DVBLPZ87Lum0e2',
                    text: 'Let\'s handle the interfacing.',
                    timestamp: '2019-10-12 19:25:15',
                },
            ],
        },
        {
            id: '4b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
            title: 'Описание и обсуждение шаблонов проектирования',
            messages: [],
        },
        {
            id: '5b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
            title: 'Параметризированный запрос к БД Oracle',
            messages: [],
        },
        {
            id: '6b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
            title: 'Lifecycle Hooks in React',
            messages: [],
        },
        {
            id: '1b9d6bcd-bbfd-1b2d-9b5d-ab8dfbbd4bed',
            title: 'Наследование и интерфейс',
            messages: [
                {
                    uid: 'bUtEOIsAYjZBK2DVBLPZ87Lum0e2',
                    text: 'Twelve minutes to ignition.',
                    timestamp: '2019-10-01 10:05:40',
                },
                {
                    uid: 'bUtEOIsAYjZBK2DVBLPZ87Lum0e2',
                    text: 'Let\'s handle the interfacing.',
                    timestamp: '2019-10-02 09:25:15',
                },
            ],
        },
        {
            id: '2b9d6bcd-bbfd-2b2d-9b5d-ab8dfbbd4bed',
            title: 'Современный и эффективный С++',
            messages: [],
        },
        {
            id: '3b9d6bcd-bbfd-3b2d-9b5d-ab8dfbbd4bed',
            title: 'Ошибка: Unable to find static library: dclusr.lib',
            messages: [],
        },
        {
            id: '7b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
            title: 'Web development',
            messages: [
                {
                    uid: 'Blvtzc3HdoUKoA66rI3SzRgbUD22',
                    text: 'Lorem ipsum dolor sit amet.',
                    timestamp: '2019-10-11 11:05:40',
                },
                {
                    uid: 'bUtEOIsAYjZBK2DVBLPZ87Lum0e2',
                    text: 'Let\'s handle the interfacing.',
                    timestamp: '2019-10-12 19:25:15',
                },
            ],
        },
        {
            id: '4b9d6bcd-bbfd-5b2d-9b5d-ab8dfbbd4bed',
            title: 'Описание и обсуждение шаблонов проектирования',
            messages: [],
        },
        {
            id: '5b9d6bcd-bbfd-6b2d-9b5d-ab8dfbbd4bed',
            title: 'Параметризированный запрос к БД Oracle',
            messages: [],
        },
        {
            id: '6b9d6bcd-bbfd-7b2d-9b5d-ab8dfbbd4bed',
            title: 'Lifecycle Hooks in React',
            messages: [],
        },
        {
            id: '1b9d6bcd-bbfd-4b1d-9b5d-ab8dfbbd4bed',
            title: 'Наследование и интерфейс',
            messages: [
                {
                    uid: 'Blvtzc3HdoUKoA66rI3SzRgbUD22',
                    text: 'Twelve minutes to ignition.',
                    timestamp: '2019-10-01 10:05:40',
                },
                {
                    uid: '5hqi299DwPdNGaY6uiqAKceYzhw1',
                    text: 'Let\'s handle the interfacing.',
                    timestamp: '2019-10-02 09:25:15',
                },
            ],
        },
        {
            id: '2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
            title: 'Современный и эффективный С++',
            messages: [],
        },
        {
            id: '3b9d6bcd-bbfd-4b3d-9b5d-ab8dfbbd4bed',
            title: 'Ошибка: Unable to find static library: dclusr.lib',
            messages: [],
        },
        {
            id: '7b9d6bcd-bbfd-4b4d-9b5d-ab8dfbbd4bed',
            title: 'Web development',
            messages: [
                {
                    uid: '5hqi299DwPdNGaY6uiqAKceYzhw1',
                    text: 'Lorem ipsum dolor sit amet.',
                    timestamp: '2019-10-11 11:05:40',
                },
                {
                    uid: 'Blvtzc3HdoUKoA66rI3SzRgbUD22',
                    text: 'Let\'s handle the interfacing.',
                    timestamp: '2019-10-12 19:25:15',
                },
            ],
        },
        {
            id: '4b9d6bcd-bbfd-4b5d-9b5d-ab8dfbbd4bed',
            title: 'Описание и обсуждение шаблонов проектирования',
            messages: [],
        },
        {
            id: '5b9d6bcd-bbfd-4b6d-9b5d-ab8dfbbd4bed',
            title: 'Параметризированный запрос к БД Oracle',
            messages: [],
        },
        {
            id: '6b9d6bcd-bbfd-4b7d-9b5d-ab8dfbbd4bed',
            title: 'Lifecycle Hooks in React',
            messages: [],
        },
    ],
};

export default initialState;