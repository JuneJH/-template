import { interceptorResponse } from '@/utils/interceptorResponse';
import { interceptorRequest } from '@/utils/interceptorsRequest';
import axios from 'axios';

const instance = axios.create({
    timeout:5000,
})

instance.interceptors.request.use(interceptorRequest);
instance.interceptors.response.use(interceptorResponse);