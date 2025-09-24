import apiClient from './api_client';

interface PersonaFields {
    name?: string;
    description?: string;
    avatar?: File | null;
}

export default function usePersonaService() {
    const createPersona = async (fields: PersonaFields) => {
        const formData = new FormData();
        if (fields.name === undefined) {
            throw new Error('NAME_REQUIRED');
        }
        formData.append('name', fields.name);

        if (fields.description === undefined) {
            throw new Error('DESC_REQUIRED');
        }
        formData.append('description', fields.description);

        if (fields.avatar instanceof File) {
            formData.append('avatar', fields.avatar);
        } else if (fields.avatar === null) {
            formData.append('avatar', '');
        }

        try {
            const res = await apiClient.post('p/create', formData);
            return res.data;
        } catch (error: any) {
            throw new Error('P_ERROR_CREATE');
        }
    };

    const readPersona = async (pk: string) => {
        try {
            const res = await apiClient.get(`p/read/${pk}`);
            return res.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('NOT_FOUND');
            }
            throw new Error('P_ERROR_READ');
        }
    };

    const deletePersona = async (pk: string) => {
        try {
            const res = await apiClient.delete(`p/delete/${pk}`);
            return res.status; // обычно 204
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('NOT_FOUND');
            }
            throw new Error('P_ERROR_DELETE');
        }
    };

    const updatePersona = async (fields: PersonaFields, pk: string) => {
        const formData = new FormData();
        if (fields.name !== undefined) {
            formData.append('name', fields.name);
        }
        if (fields.description !== undefined) {
            formData.append('description', fields.description);
        }
        if (fields.avatar instanceof File) {
            formData.append('avatar', fields.avatar);
        } else if (fields.avatar === null) {
            formData.append('avatar', '');
        }

        try {
            const res = await apiClient.patch(`p/update/${pk}`, formData);
            return res.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('NOT_FOUND');
            }
            throw new Error('P_ERROR_UPDATE');
        }
    };

    const listPersonas = async () => {
        try {
            const res = await apiClient.get('p/list');
            return res.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('NOT_FOUND');
            }
            throw new Error('P_ERROR_LIST');
        }
    };

    return {
        createPersona,
        readPersona,
        updatePersona,
        deletePersona,
        listPersonas,
    };
}