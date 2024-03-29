import axios from 'axios';

var url = 'http://localhost:3003/v1/syncs';

var headers = {
    'Content-Type': 'application/json'
};

var body = {
    url: 'https://api.hubapi.com/crm/v3/objects/contacts/search',
    method: 'post',
    headers: {
        authorization: `Bearer fake-token`
    },
    body: {
        limit: 1,
        properties: []
    },
    unique_key: 'id',
    paging_request_path: 'after',
    paging_response_path: 'paging.next.after'
};

let res = await axios.post(url, body, { headers: headers }).catch((err) => {
    console.log(err);
});

if (res != null) {
    console.log(res.data);
}
