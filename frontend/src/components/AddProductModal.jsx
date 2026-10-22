    import React, { useRef } from 'react'
    import { useProductStore } from '../store/useProductStore'
    import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from 'lucide-react'
    
    function AddProductModal() {
        const { addProduct, formData, setFormData, loading } = useProductStore();
        const add_modal_ref = useRef(null);
      return (
        <dialog ref={add_modal_ref} id="add_product_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                </form>

                <h3 className="font-bold text-xl mb-8">Add New Product</h3>
                <form onSubmit={addProduct} className="space-y-6">
                    <div className="grid gap-6">
                        {/* Add name field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Product Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                                    <Package2Icon className="size-5" />
                                </div>
                                <input
                                type="text" 
                                placeholder="Enter Product Name"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />

                            </div>

                        </div>
           
                        {/* Add price field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Product Price</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                                    <DollarSignIcon className="size-5" />
                                </div>
                                <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Add image field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Product Image Link</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                                    <ImageIcon className="size-5" />
                                </div>
                                <input
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />

                            </div>

                        </div>
                    </div>

                    {/* Add or Remove */}
                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => add_modal_ref.current?.close()}
                        >
                            Cancel
                        </button>
                        <button
                        type="submit"
                        className="btn btn-primary mix-w-120px"
                        disabled={ !formData.name || !formData.price || !formData.image || loading }
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"> </span>
                            ) : (
                            <>
                                <PlusCircleIcon className="size-5 mr-2" />
                                Add Product
                            </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Modal Backdrop */}
            <form  method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            
        </dialog>
      )
    }
    
    export default AddProductModal
    