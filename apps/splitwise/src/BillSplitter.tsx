import { useReducer } from 'react'
import AddItemsForm from './AddItemsForm';
import AddPersonForm from './AddPersonForm';
import BillSummary from './BillSummary';
import PersonList from './PersonList';
import './BillSplitter.css'
import { addItem, addPerson, updateItemAmount, updateItemAssignedTo, updateItemName } from './action';


export type Person = {
    id: string;
    name: string;
}

export type BillItem = {
    id: number;
    name: string;
    amount: number;
    assignedTo: string[];
}

export type BillSplitterState = {
    people: Person[];
    items: BillItem[]
}

export type BillAction =
  | { type: "add_person"; data: { name: string } }
  | { type: "add_item" }
  | { type: "update_item_name"; data: { id: number; name: string } }
  | { type: "update_item_amount"; data: { id: number; amount: number } }
  | { type: "update_item_assigned_to"; data: { id: number; person: string } };

export type updateItemName = { type: "update_item_name"; data: { id: number; name: string } }
export type updateIteAmount = { type: "update_item_amount"; data: { id: number; amount: string } }
export type updateItemAssignedTo = { type: "update_item_assigned_to"; data: { id: number; person: string } }

function updateItem(items: BillItem[], id: number, updater: (item: BillItem) => BillItem): BillItem[] {
    return items.map((item) => item.id === id ? updater(item) : item)
}

function billReducer(state: BillSplitterState, action: BillAction): BillSplitterState {
    console.log(state, action)
    switch (action.type) {
        case 'add_person':
            return {
                ...state,
                people: [
                    ...state.people,
                    {
                        id: `p${state.people.length + 1}`,
                        name: action.data.name
                    }
                ]
            }
        case 'add_item':
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        id: state.items.length + 1,
                        name: '',
                        amount: 0,
                        assignedTo: []
                    }
                ]
            }
        case 'update_item_name':
            return {
                ...state,
                items: updateItem(state.items, action.data.id, (item => ({
                    ...item,
                    name: action.data.name
                })))
            }
        case 'update_item_amount':
            return {
                people: state.people,
                items: updateItem(state.items, action.data.id, (item => ({
                    ...item,
                    amount: action.data.amount
                })))
            }

        case 'update_item_assigned_to':
            return {
                people: state.people,
                items: updateItem(state.items, action.data.id, (item => ({
                    ...item,
                    assignedTo: [
                        ...item.assignedTo,
                        action.data.person
                    ]
                })))
            }
        default:
            return state;
    }
}




function BillSplitter() {
    const initialState: BillSplitterState = {
        people: [],
        items: [
            {
                id: 1,
                name: "",
                amount: 0,
                assignedTo: []
            }
        ]
    }
    const [billSplitterData, dispatch] = useReducer(billReducer, initialState)

    // Wrapper Callbacks
    const handleAddPerson = (name: string) => dispatch(addPerson(name));
    const handleAddItem = () => dispatch(addItem());
    const handleUpdateItemName = (id: number, name: string) => dispatch(updateItemName(id, name));
    const handleUpdateItemAmount = (id: number, amount: number) => dispatch(updateItemAmount(id, amount));
    const handleAssignPerson = (id: number, person: string) => dispatch(updateItemAssignedTo(id, person));


    return (
        <section className='bill-splitter-wrapper'>
            <section className="form-wrapper">
                <AddPersonForm onAddPerson={handleAddPerson} />
                <PersonList persons={billSplitterData.people} />
                <AddItemsForm 
                billSplitterData={billSplitterData} 
                onAddItem={handleAddItem}
                onUpdateItemName={handleUpdateItemName}
                onUpdateItemAmount={handleUpdateItemAmount}
                onAssignedPerson={handleAssignPerson}
                 />
            </section>
            <BillSummary billSplitterData={billSplitterData} />
        </section>
    )
}

export default BillSplitter
