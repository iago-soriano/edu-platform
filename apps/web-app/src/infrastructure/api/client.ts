import { AxiosFetcher } from './axios';
import { ApiClient } from '@edu-platform/common/api';

export const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST)
export const api = new ApiClient(axios);