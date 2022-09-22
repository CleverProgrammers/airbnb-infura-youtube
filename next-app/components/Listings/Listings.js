import ListingItem from './ListingItem'
import { useAirbnb } from '../../hooks/useAirbnb'

const Listings = ({ setShowReserveListingModal }) => {
  const { properties } = useAirbnb()

  return (
    <div className='px-20'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
        {properties.map((item, index) => (
          <ListingItem
            key={index}
            item={item}
            setShowReserveListingModal={setShowReserveListingModal}
          />
        ))}
      </div>
    </div>
  )
}

export default Listings
