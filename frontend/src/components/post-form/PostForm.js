import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input, Select, RTE, Button } from '../form'

export default function PostForm({post}) {

    // for navigation and userdata
    const navigate = useNavigate();
    const userData = useSelector(state => state.authReducer.auth.userData);

    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues : {
            title : post?.title || "",
            slug : post?.slug || "",
            content : post?.content || "",
            status : post?.status || "active",
        },
    });
    

    const onSubmit = async () => {
        if(post) {
            // write logic for post updation and upload
        }
        else {
            // write logic for new post upload
        }
    }

    const slugTransfor = useCallback((value) => {
        if(value && typeof value === "string") {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === "title") {
                setValue("slug", slugTransfor(value.title), {shouldValidate: true});
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [setValue, slugTransfor, watch]);

  return (
    <div>
        <h1 style={{marginTop:"5px"}}>Create Post</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{display: "flex", flexDirection: "column" }}>
                <div>
                    <Input style={{width: "50%", marginLeft: "10px"}} type="text" placeholder="Title" {...register("title", {required: true})} />
                    <Input style={{width: "50%", marginLeft: "10px"}} type="text" placeholder="slug" {...register("slug", {required: true})} onInput={(e) => {setValue("slug", slugTransfor(e.target.value), {shouldValidate: true})}} />
                </div>
                <RTE label="Content : " control={control} defaultValue={getValues("content")} name="content" />
            </div>
            <div>
                <Input type="file" label="Featured Image" accept="image/png, image/jpg, image/jpeg, image/gif" {...register("image", {required: !post})} />
                <Select options={["active", "Inactive"]} label="Status : " {...register("status", {required: true})} />
            </div>
            <Button type="submit" >
                {post ? "Update" : "Submit"}
            </Button>
        </form>
    </div>
  )
}
