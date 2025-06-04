export interface ICreateCv {
    content: string;
    userId: string;
}
export type IUpdateCv = ICreateCv;

export type ICv = ICreateCv & { id: string };
