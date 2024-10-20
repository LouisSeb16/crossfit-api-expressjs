import workoutModel from "@src/models/workout";

const getAllWorkouts = async (query: any) => {
    const filter = {} as any;
    if (query.mode) filter.mode = query.mode;
    return await workoutModel.find();
};

const getOneWorkout = async (workoutId: string) => {
    return await workoutModel.findById(workoutId).exec();
};

const createNewWorkout = async (workoutData: any) => {
    const newWorkout = new workoutModel(workoutData);
    return await newWorkout.save();
};

const updateWorkout = async (workoutId: string, updateData: any) => {
    return await workoutModel.findByIdAndUpdate(workoutId, updateData, { new: true });
};

const deleteWorkout = async (workoutId: string) => {
    try {
        return await workoutModel.findByIdAndDelete(workoutId);
    } catch (error: any) {
        if (error.name === 'CastError') {
            throw new Error("Invalid workout ID format");
        }
        throw error;
    }

};

const workoutService = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateWorkout,
    deleteWorkout
}

export default workoutService;
