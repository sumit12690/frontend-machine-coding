import type { BillAction } from "./BillSplitter";

export const addPerson = (name:string): BillAction => ({
    type: 'add_person',
    data: { name }
})

export const addItem = (): BillAction => ({
    type: 'add_item',
})

export const updateItemName = (id: number, name: string): BillAction => ({
    type: 'update_item_name',
    data: { id, name }
})

export const updateItemAmount = (id: number, amount: number): BillAction => ({
    type: 'update_item_amount',
    data: { id, amount }
})

export const updateItemAssignedTo = (id: number, person: string): BillAction => ({
    type: 'update_item_assigned_to',
    data: { id, person }
})
