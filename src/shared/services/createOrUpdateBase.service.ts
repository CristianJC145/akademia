import axios from '../utils/axios';
import {JsonToFormDataService} from './jsonToFormData.service';

const jsonToFormDataService = new JsonToFormDataService();

export class CreateOrUpdateBaseService<ICreateOrUpdateContentService> {
    protected url = '';
    protected isFormData = false;

    async run(data: ICreateOrUpdateContentService, id?: number): Promise<void> {
        let newData: any = data;

        if (this.isFormData) {
            newData = jsonToFormDataService.run(data);
        }

        console.log(newData);

        if (id) {
            await this.update(newData, id);
        } else {
            await this.create(newData);
        }
    }

    private async create(data: any): Promise<void> {
        await axios.post(this.url, data);
    }

    private async update(data: any, id: number): Promise<void> {
        await axios.put(this.url + '/' + id, data);
    }


}