import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';

const UpdateOrderModel = ({order, isOpen, onClose}) => {
    const [status, setStatus] = useState(order?.status);

    const [updateOrderStatus, {isLoading, error}] = useUpdateOrderStatusMutation();

    const handleUpdateOrderStatus = async() => {
        try {
            await updateOrderStatus({id: order?._id, status})
            onClose(); 
            
        } catch (error) {
            console.error("Failed to update order status:", error);
            
        }
    }

    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-2">Update Order Status</h2>
        <p className="text-gray-500 mb-4">Status</p>
        <div className="mb-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateOrderStatus}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateOrderModel
