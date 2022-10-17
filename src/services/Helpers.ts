import Constants from "../Constants";

class Helpers {
    static GetUrlPath(url: string): string {

        return url.replace(Constants.BaseAPIURL, '');
    }
    
    static GetUrlLastSegment(url: string): string {
        let segment = '';
        const segments = url.split('/');
        
        if (segments.length > 1) {
            segment = segments[segments.length - 1] || segments[segments.length - 2]
        }

        return segment;
    }
    static FormatDate(dateStr: string): string {
        const dt = new Date(dateStr);

        return dt.toLocaleString();
    }
}

export default Helpers;