import { FC, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormModal } from './formModal';
import { FormImageInput, FormInput } from './formComponents';
import axios from 'axios';
import { useEffect } from 'react';
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin';
import { FoodEntry } from '@prisma/client';

type FoodEntryFormInput = {
    name: string;
    calories: number;
    foodImage?: string;
};

type FoodEntryFormProps = {
    isOpen: boolean,
    setIsOpen: any,
    submitFoodEntry: any,
    mealId: number,
    mealName: string,
    entry?: FoodEntry
}

const defaultValues = { name: '', calories: 0}

export const FoodEntryForm : FC<FoodEntryFormProps> = ({isOpen, setIsOpen, submitFoodEntry, mealId, mealName, entry}) => {
    const [lastDecodedText, setLastDecodedText] = useState<string>('');
    
    const lastDecodedTextRef = useRef(lastDecodedText);

    useEffect(() => {
        if (entry && defaultValues.calories === 0) {
            resetField('name', {defaultValue: entry.name})
            resetField('calories', {defaultValue: entry.calories})
        }
    }, [entry])

    useEffect(() => {
        lastDecodedTextRef.current = lastDecodedText;
    }, [lastDecodedText]);

    const { register, handleSubmit, reset, resetField, watch } = useForm<FoodEntryFormInput>({
        defaultValues,
    });

    useEffect(() => {
        if (!isOpen) {
            setLastDecodedText('');
        }
    }, [isOpen])

    let debounceOnSuccess = async (decodedText: string, result: any) => {
        if (decodedText === lastDecodedTextRef.current) {
            return;
        }
    
        setLastDecodedText(decodedText);
    
        try {
            console.log(decodedText)
            const { data } = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${decodedText}.json`)
            if (data) {
                console.log(data.product.product_name, data.product.nutriments["energy-kcal_serving"])
                resetField('name', {defaultValue: data.product.product_name})
                resetField('calories', {defaultValue: data.product.nutriments["energy-kcal_serving"]})
            }
        } catch (error) {
        }
    };

    const getFoodNameFromImage = async (image: File) => {
        if (!image) return;
        try {
            const { data } = await axios.post(
                'https://fooddetectorcustomv-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/f16a2402-37be-4d23-9442-a659be1ed857/classify/iterations/Iteration1/image',
                image,
                {
                    headers: {
                        'Prediction-Key': 'b56f9544c8374a7aaa27ed380f235803',
                        'Content-Type': 'application/octet-stream',
                    },
                }
            )
            if (data && data.predictions) {
                resetField('name', {defaultValue: data.predictions[0].tagName});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit: SubmitHandler<FoodEntryFormInput> = async (data) => {
        const { name, calories } = data;

        const foodEntryData = {
            name,
            calories,
            mealId,
        };
        submitFoodEntry(foodEntryData);
        if (!entry) {
            reset(defaultValues);
        }
    }
    
    return (
        <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1 className="text-xl text-primary font-semibold mb-4">Add {mealName} entry</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                    <FormInput
                        inputProps={register('name', {
                            required: 'This is required',
                            minLength: 3,
                        })}
                        labelFor={'name'}
                        label="Name"
                    />
                    <FormInput
                        inputProps={register('calories', {
                            required: 'This is required',
                            valueAsNumber: true,
                            min: 0,
                        })}
                        type="number"
                        labelFor={'calories'}
                        label="Calories"
                    />
                    <FormImageInput
                        inputProps={register('foodImage', {
                            onChange: (e) => {
                                if (!e.target.files) return;
                                getFoodNameFromImage(e.target.files[0])
                            }
                        })}
                        labelFor={'foodImage'}
                        label="Food image(optional)"
                    />
                    
                    <Html5QrcodePlugin 
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        isOpen={isOpen}
                        qrcodeRegionId={`qrcode_${mealId}_${entry?.id || 'new'}`}
                        qrCodeSuccessCallback={debounceOnSuccess}/>
                    <div className="flex items-center gap-8 pt-4 justify-end">
                        <button type="button" className="font-medium text-slate-500 cursor-pointer" onClick={() => reset(defaultValues)}>
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="font-medium rounded-lg px-4 py-2 bg-blue-500 text-white cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </FormModal>
    )
}