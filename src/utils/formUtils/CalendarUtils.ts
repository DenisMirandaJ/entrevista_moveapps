
export interface RepairDateSelectorFormData {
    startDate: number | null
    endDate: number | null
} 

export const getEmptyRepairDateSelectorForm = (): RepairDateSelectorFormData => {
    return {
        startDate: null,
        endDate: null
    }
}