import create from 'zustand'

type DateStore = {
    selectedDate: Date,
    startDate: Date,
    endDate: Date,
}

const startDate = new Date()
startDate.setHours(0, 0, 0, 0)
const endDate = new Date()

export const useDateStore = create<DateStore>((set) => ({
    selectedDate: new Date(),
    startDate: startDate,
    endDate: endDate,
}))