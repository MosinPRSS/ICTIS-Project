import apiClient from './api_client';
import axios from 'axios';
import { headers } from 'next/headers';
import { useCallback } from 'react';

interface PersonaFields {
    name?: string,
    description?: string,
    avatar?: File | null,
}
export default function usePersonaService() {
    // основные методы - добавить/удалить/прочитать/изменить
    const createPersona = useCallback(async(
        fields: PersonaFields
    ) => {
        try {
            const formData = new FormData();
            if (fields.name === undefined) {
                return "NAME";
            } else {
                formData.append('name', fields.name);
            }
            if (fields.description === undefined) {
                return "DESC";
            } else {
                formData.append('description', fields.description);
            }
            
            if (fields.avatar instanceof File) {
                formData.append('avatar', fields.avatar);
            } else if (fields.avatar === null) {
                formData.append('avatar', '');
            }

            const res = await apiClient.post('p/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            return res.data
        } catch (error: any) {
            console.error("Что-то пошло не так...");
        }
        
    }, []);

    return {
        createPersona,
    };
}