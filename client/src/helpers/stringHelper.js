export default class StringHelper {
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
        if (Array.isArray(string)) {
            return JSON.stringify(string);
        }
        if (typeof string === "object") {
            return JSON.stringify(string);
        }
        try {
            JSON.parse(string);
        } catch (e) {
            return JSON.stringify(string);
        }
        return string;
    }
}
