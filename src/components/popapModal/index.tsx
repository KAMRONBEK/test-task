import { FC } from 'react';
import Button from '../button';

interface IPopupContent {
    status: boolean;
    details: string;
    isChanged: boolean;
    handleStatusChange: () => void;
    handleDetailsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSave: () => void;
}

const PopapModal: FC<IPopupContent> = ({
    details,
    isChanged,
    status,
    handleDetailsChange,
    handleSave,
    handleStatusChange,
}) => {
    return (
        <div className="border w-full rounded-lg py-2 px-3">
            <div className="flex xl:flex-row flex-col xl:items-center justify-between gap-4 ">
                <span className="text-lg font-bold">
                    Status:
                    <span className="font-normal mx-2 text-base">
                        {status ? 'Active' : 'Inactive'}
                    </span>
                </span>
                <Button title="Change Status" onClick={handleStatusChange} />
            </div>
            <div className="flex xl:flex-row flex-col xl:items-center justify-between my-4 gap-4">
                <span className="text-lg font-bold">Details:</span>
                <textarea
                    className="border rounded bg-gray-50 p-2"
                    value={details}
                    onChange={handleDetailsChange}
                />
            </div>
            {isChanged && (
                <Button title="Save" onClick={handleSave} className="my-2" />
            )}
        </div>
    );
};

export default PopapModal;
