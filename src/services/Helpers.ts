import Constants from "../Constants";
import { ResourceParam } from "./redux/Types";

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

    static GetModelParamVaulesArray(src: any, exclude: Array<string> = []): Array<ResourceParam> {
        const result: Array<ResourceParam> = [];
        const exclusions = [
            'name','created', 'homeworld',
            'edited','url', 'title',
            ...exclude
        ];
        
        for (let prop in src) {
            if (exclusions.includes(prop) === false && Array.isArray(src[prop]) === false) {
                result.push( {
                    name: prop.replaceAll('_',' '),
                    value: src[prop]
                });
            }
        }

        return result;
    }
}

export default Helpers;