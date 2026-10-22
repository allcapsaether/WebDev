import { create } from 'zustand';
import axios from 'axios';
import Toast from 'react-hot-toast';

const BASE_URL = "http://localhost:3000"

export const useProductStore = create((set,get) => ({
    products:[],
    loading:false,
    error:null,

    formData: {
        name:"",
        price:"",
        image:""
    },

    setFormData: (formData) => set({formData}),
    resetForm: () => set({ formData: {name: "", price: "", image: ""} }),

    addProduct: async(e) => {
        e.preventDefault();
        set({loading:true});
        
        try {
            const { formData } = get();
            await axios.post(`${BASE_URL}/api/products`, formData);
            await get().fetchProducts();
            get().resetForm();
            Toast.success("Product added successfully");
        } catch (error) {
            console.log("Error adding data", error);
            Toast.error("Something went wrong");

        } finally {

        };
    },
    
    fetchProducts: async () => {
        set({loading:true});
        try {
            const response = await axios.get(`${BASE_URL}/api/products`)
            set({products:response.data.data,error:null})
        } catch (error) {
            if(error.status == 429) {   
                set({error: "Rate Limit Exceeded", products: [] })
            }
            else set ({error: "Something went wrong", products: [] })

        } finally {
            set({loading:false});
        }
    },

    deleteProduct: async (id) => {
        set ({loading: true});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set(prev => ({products: prev.products.filter(product => product.id !== id)}));
            Toast.success("Product deleted successfully.");
        } catch (error) {
            console.log("Error in deleting the product", error);
            Toast.error("Something went wrong.");
        } finally {
            set({loading: false});
        }
    },



}));