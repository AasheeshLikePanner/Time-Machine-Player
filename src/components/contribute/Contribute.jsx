import React from "react"
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import service from "../../appwrite/conf";
import { useDispatch } from 'react-redux';
import  { ContainerOpen }  from '../../store/VideoPlaySlice';


export default function Contribute(){

    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm({
        defaultValues:{
            name:'',
            year:null,
            url:''
        }
    })

    const createSong = async (data) => {
        console.log(data);
        const name = data.name.trim()
                            .toLowerCase()
                            .replace(/[^a-zA-Z\d\s]+/g, "-")
                            .replace(/\s/g, "-");
        const song = await service.addSong(name, Number(data.year),data.url);
        if(song){
            alert('The song is uploaded')

        }else{
            alert('The song is already uploaded')
        }
        dispatch(ContainerOpen(false))
    }

    return(
        <div className="z-10 h-1/2 w-1/3 top-1/4 fixed max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Add Song</h1>
                <form onSubmit={handleSubmit(createSong)}>
                    <div className="mb-4">
                    <TextField label="Title" variant="outlined" fullWidth
                    {...register("name", {
                        required:"Please enter the name of music"
                      })} />
                    </div>
                    <div className="mb-4">
                    <TextField type="number" label="Released Date" variant="outlined" fullWidth
                    {...register("year", {
                        required:"Please enter the year"
                      })} />
                    </div>
                    <div className="mb-4">
                    <TextField label="Youtube Link" variant="outlined" fullWidth multiline rows={2}
                     {...register("url", {
                        required:"Please enter the link"
                      })} />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                    </button>
                </form>
                <h2 className="text-sm my-1"><span className="text-lg text-red-600">Note:     </span>
                   Paste The youtube music link in link block also write
                <span className="text-red-700"> orignial released year</span> of the music.</h2>
        </div>
    )
}