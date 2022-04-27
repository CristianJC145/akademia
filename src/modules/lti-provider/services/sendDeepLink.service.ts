import axios from 'axios';
//import {services} from '../../../shared/constant/services';

interface ISendDeepLinkService {
    id:number;
    title: string;
    urlContent: string;
}

export class SendDeepLinkService {
    async run(data: ISendDeepLinkService): Promise<void> {
        const ltik = localStorage.getItem('ltik');

        fetch('http://localhost:3030/deeplink',{
            method:'post',
            body:JSON.stringify(data),
            credentials: 'include',
            headers: { Authorization: `Bearer ${ltik}` }
        })
            .then(response => response.text())
            .then(auxHtml => {
                console.log(auxHtml);
                const form =  new DOMParser().parseFromString(auxHtml, 'text/html');
                console.log(form);
                document.body.appendChild(form.body);
                document.getElementById('ltijs_submit').submit();
            });
        //await fetch.post(`http://localhost:3030/deeplink`, data, config);
    }
}