

export default class {

    public static getImageURLs(text: string): RegExpExecArray | null {
        const regex = /https?:\/\/[^\/]+\/[^\/]+\.(jpeg|jpg|png|gif)/g;
        return regex.exec(text);
    }
    public static getVideoURLs(text: string): RegExpExecArray | null {
        const regex = /https?:\/\/[^\/]+\/[^\/]+\.(mp4|mov|wmv|avi|flv|mkv)/g;
        return regex.exec(text);
    }
}