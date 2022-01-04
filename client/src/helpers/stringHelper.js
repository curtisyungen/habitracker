export class StringHelper {
    static parseJSON(string, defaultValue) {
        if (!string) return defaultValue;
        try {
            JSON.parse(string);
        } catch (e) {
            return string;
        }
        return JSON.parse(string);
    }

    static stringifyJSON(string) {
        if (!string) return;
        try {
            JSON.parse(string);
        } catch (e) {
            return JSON.stringify(string);
        }
        return string;
    }
}
