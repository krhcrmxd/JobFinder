export const Role = {
    Employer: "Employer",
    Employee: "Employee",
    Customer: "Customer",
    Freelancer: "Freelancer",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const Priority = {
    Normal: "Normal",
    Immediate: "Immediate",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export const Currency = {
    USD: "USD",
    EUR: "EUR",
    UAH: "UAH",
} as const;

export type Currency = (typeof Currency)[keyof typeof Currency];

export const Tokens = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
} as const;

export type Tokens = (typeof Tokens)[keyof typeof Tokens];

export const ApplicationStatus = {
    Pending: "Pending",
    Accepted: "Accepted",
    Rejected: "Rejected",
} as const;

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export const Endpoints = {
    application: "/applications",
    auth: "/auth",
    cv: "/cv",
    order: "/order",
    user: "/user",
    vacancy: "/vacancy",
} as const;

export type Endpoints = (typeof Endpoints)[keyof typeof Endpoints];

export const Tabs = {
    myOrders: "My Orders",
    myVacancies: "My Vacancies",
    Orders: "Find Orders",
    Vacancies: "Find Vacancies",
} as const;
export type Tabs = (typeof Tabs)[keyof typeof Tabs];

export const TabRoles = {
    myOrders: Role.Customer,
    myVacancies: Role.Employer,
    Orders: Role.Freelancer,
    Vacancies: Role.Employee,
} as const;

export type TabRoles = (typeof TabRoles)[keyof typeof TabRoles];
