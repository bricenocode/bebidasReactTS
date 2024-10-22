import { StateCreator} from 'zustand'
import { FavoriteSliceType } from './favoritesSlice'

type Notification = {
    text:string,
    error: boolean,
    show: boolean,
}

export type NotificationSliceType = {
    notification: Notification,
    showNotification: (payload:Pick<Notification, 'text' | 'error'>) => void,
    hideNotification: () => void
}
export const createNotificationSlice: StateCreator<NotificationSliceType/*Esta es la forma para tipar con el anidado de slices*/ & FavoriteSliceType , [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        text:'',
        error: false,
        show: false,
    },
    showNotification: (payload) => {
        set(
            {
                notification: {
                    text:payload.text,
                    error: payload.error,
                    show:true
                }
            }
        )
        //Esto es para que despues de 5 segundos se oculte la notificación.
        setTimeout( () => {
            get().hideNotification()
        }, 5000)
    },
    hideNotification: () => {
        set({
            notification:{
                text:'',
                error: false,
                show: false,
            },
        })
    }
})
