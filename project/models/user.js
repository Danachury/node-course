const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://easy:easy@localhost:27017/easy', { useNewUrlParser: true });

const SexEnum = ['MALE', 'FEMALE'];

const userSchema = new Schema({
    name: String,
    age: { type: Number, min: [10, 'Age Must not be minor than 10'], max: [100, 'Age Must not be greater than 100'] },
    birthday: Date,
    username: { type: String, required: true, maxlength: [50, 'Username invalid'] },
    email: { type: String, required: 'Email is required' },
    password: {
        type: String,
        minlength: [8, 'Password too short'],
        validate: {
            validator: (pwd) => {
                return this.passwordConfirmation === pwd;
            },
            message: 'Passwords do not match'
        }
    },
    sex: { type: String, enum: { values: SexEnum, message: 'Sex Invalid option' } }
});

userSchema
    .virtual('passwordConfirmation')
    .get(() => this.passwordConfirmation)
    .set((pwdC) => this.passwordConfirmation = pwdC);

const User = mongoose.model('User', userSchema);

module.exports.User = User;
