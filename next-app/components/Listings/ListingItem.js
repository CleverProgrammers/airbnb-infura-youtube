import Image from 'next/image'
import { useState } from 'react'
import Web3 from 'web3'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useAppContext } from '../../context/context'

const ListingItem = ({ item, setShowReserveListingModal }) => {
  const [priceInEth] = useState(Web3.utils.fromWei(item.pricePerDay))

  const { setSelectedPropertyId } = useAppContext()

  return (
    <div
      className='flex flex-col space-y-3 cursor-pointer max-w-[20rem]'
      onClick={event => {
        event.preventDefault()
        if (item.isBooked) return
        setShowReserveListingModal(true)
        setSelectedPropertyId(item.id)
      }}
    >
      <div className='relative h-[22rem] w-auto max-w-[20rem] group'>
        <div className='relative h-[20rem] w-[20rem]'>
          <div className={`${item.isBooked && ''}`}>
            <Image
              className='h-full w-full rounded-xl object-cover'
              src={item.imgUrl}
              layout='fill'
            />
          </div>
        </div>

        {address && (
          <div className=' transition-all duration-150 absolute top-4 right-4 flex space-x-2'>
            <HeartIcon
              className={`w-6 h-6 text-white  ${
                item.isBooked ? 'fill-red-500' : 'opacity-80'
              }`}
            />
          </div>
        )}
      </div>

      <div>
        <div className='flex justify-between items-center'>
          <h3 className='font-medium'>{item.name}</h3>
          <div className='flex items-center space-x-1'>
            <StarIcon className='h-3 w-3' />
            <p className='text-sm text-gray-800'>{4.8}</p>
          </div>
        </div>

        <p className='text-sm font-light text-gray-600'>{788} miles</p>
        <p className='text-sm font-light text-gray-600'>{item.address}</p>

        {item.isBooked ? (
          <div>Property Unavailable</div>
        ) : (
          <>
            <p className='text-sm font-light text-gray-800 mt-2'>
              <span className='text-base font-medium'>
                ETH {priceInEth.toLocaleString('en-US')}
              </span>
              &nbsp;night
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default ListingItem
