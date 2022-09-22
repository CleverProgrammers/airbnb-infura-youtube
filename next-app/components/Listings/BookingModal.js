import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useAirbnb } from '../../hooks/useAirbnb'
import { useAppContext } from '../../context/context'

const BookingModal = ({
  showReserveListingModal,
  setShowReserveListingModal,
}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const { bookProperty } = useAirbnb()
  const { selectedPropertyId } = useAppContext()

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  }

  const handleSelect = ranges => {
    setStartDate(new Date(ranges.selection.startDate).getTime())
    setEndDate(new Date(ranges.selection.endDate).getTime())
  }

  const closeModal = () => {
    setShowReserveListingModal(false)
  }

  const onConfirm = event => {
    event.preventDefault()

    bookProperty(selectedPropertyId, startDate, endDate)

    closeModal()
  }

  return (
    <Transition appear show={showReserveListingModal} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Reserve Listing
                </Dialog.Title>

                <div className='mt-2'>
                  <DateRangePicker
                    minDate={new Date()}
                    rangeColors={['#FD5B61']}
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                  />

                  <div className='mt-4 flex justify-end'>
                    <button
                      onClick={onConfirm}
                      type='button'
                      className='border rounded-lg px-4 py-2 text-sm font-medium'
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default BookingModal
