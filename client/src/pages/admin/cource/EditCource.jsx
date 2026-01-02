import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourceTab from './CourceTab.jsx'

const EditCource = () => {
  return (
    <div className='flex-1'>
        <div className='flex items-center justify-between mb-5'>
            <h1 className='font-bold text-xl'>Add Detail Information Regarding Cource</h1>
            <Link to="lecture">
                <Button className="hover:text-blue-600" variant="link">Go to Lecture Page </Button>
            </Link>
        </div>
        <CourceTab />
    </div>
  )
}

export default EditCource