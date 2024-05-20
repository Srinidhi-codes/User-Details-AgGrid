import React, { useMemo, useState } from "react"
import './dropDown.css'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { ClickAwayListener } from '@mui/material'

const Dropdown = (props) => {
    const { data, placeholder, onChange } = props
    const [listData, setListData] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedItem, setSelectedItem] = useState(placeholder)

    const closeSelect = (index, item) => {
        setIsOpen(false)
        setSelectedIndex(index)
        setSelectedItem(item)
        onChange(item);
    }

    useMemo(() => {
        if (data) {
            setListData(data);
        }
    }, [data]);

    const filterList = (e) => {
        const filter = data.filter((item) => (item.toLowerCase().includes(e.target.value.toLowerCase())));
        setListData(filter)
    }

    return (
        <>
            <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                <div className="relative">
                    <span className="selectDrop flex text-nowrap gap-2 w-auto" onClick={() => setIsOpen(!isOpen)} >{selectedItem?.length > 14 ? selectedItem.substr(0, 8) + '...' : selectedItem} <KeyboardArrowDownOutlinedIcon className="text-[1rem]" /></span>
                    {isOpen && <div className="w-[300px] h-auto rounded-xl bg-white absolute top-[160%] left-[-20px] z-50 p-[15px] shadow-card">
                        <div className="searchField">
                            <input type="text" onChange={filterList} placeholder="Search here..." className="border capitalize border-primary p-2 border-opacity-40 rounded-[10px] outline-none w-full h-[40px]" />
                        </div>
                        <ul className="searchResult w-full m-0 py-[10px] max-h-[300px] overflow-y-scroll">
                            {listData?.map((item, index) => <li key={index} onClick={() => closeSelect(index, item)} className={`${selectedIndex === index ? 'bg-primary/30' : ''} list-none text-[18px] w-full p-[10px] hover:bg-primary hover:text-white`}>{item}</li>)}
                        </ul>
                    </div >}
                </div>
            </ClickAwayListener>
        </>
    )
}

export default Dropdown