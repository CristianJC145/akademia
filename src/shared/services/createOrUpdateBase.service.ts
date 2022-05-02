import axios from '../utils/axios';

export class CreateOrUpdateBaseService<ICreateOrUpdateContentService> {
    protected url = '';

    async run(data: ICreateOrUpdateContentService, id?: number): Promise<void> {
        if (id) {
            await this.update(data, id);
        } else {
            await this.create(data);
        }
    }

    private async create(data: ICreateOrUpdateContentService): Promise<void> {
        await axios.post(this.url, data);
    }

    private async update(data: ICreateOrUpdateContentService, id: number): Promise<void> {
        await axios.put(this.url + '/' + id, data);
    }
}