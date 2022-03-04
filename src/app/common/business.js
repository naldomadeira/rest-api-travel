import os from 'os';
import { application } from '../../config/environment';

class Business {
    envelope(document) {
        const resource = {
            meta: {
                self: os.hostname() || '',
                name: application.name || '',
                env: application.env || '',
                version: application.version || '',
            },
            records: document || [],
        };

        return resource;
    }
}

export default Business;
