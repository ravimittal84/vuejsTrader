<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{'has-error' : $v.email.$invalid && $v.email.$dirty}">
          <label for="email">Email</label>
          <input  class="form-control"
                  type="email"
                  id="email"
                  @blur="$v.email.$touch()"
                  v-model="email">
          <span v-if="$v.email.$invalid && $v.email.$dirty" class="text-danger">Please enter a valid email.</span>
        </div>
        <div class="input" :class="{'has-error' : $v.age.$invalid && $v.age.$dirty}">
          <label for="age">Your Age</label>
          <input  class="form-control"
                  type="number"
                  id="age"
                  v-model.number="age">
          <span v-if="$v.age.$invalid && $v.age.$dirty" class="text-danger">Age must be 18 or over.</span>
        </div>
        <div class="input" :class="{'has-error' : $v.password.$invalid && $v.password.$dirty}">
          <label for="password">Password</label>
          <input  class="form-control"
                  type="password"
                  id="password"
                  v-model="password">
          <span v-if="$v.password.$invalid && $v.password.$dirty" class="text-danger">Password must be at least 6 characters long.</span>
        </div>
        <div class="input" :class="{'has-error' : $v.confirmPassword.$invalid && $v.confirmPassword.$dirty}">
          <label for="confirm-password">Confirm Password</label>
          <input  class="form-control"
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword">
          <span v-if="$v.confirmPassword.$invalid && $v.confirmPassword.$dirty" class="text-danger">Passwords don't match.</span>
        </div>
        <div class="input">
          <label for="country">Country</label>
          <select  class="form-control" id="country" v-model="country">
            <option value="usa">USA</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>
        <div class="hobbies">
          <h4>Add some Hobbies</h4>
          <button class="btn btn-sm btn-success" @click.prevent="onAddHobby">Add Hobby</button>
          <div class="form-group">
            <div class="input"
                    v-for="(hobbyInput, index) in hobbyInputs"
                    :key="hobbyInput.id">
              <label class="form-label" :for="hobbyInput.id">Hobby #{{ index+1 }}</label><br>
              <div class="row">
                <div class="col-xs-10">
                  <input  class="form-control"
                        type="text"
                        :id="hobbyInput.id"
                        v-model="hobbyInput.value">
                </div>
                <button class="btn btn-sm btn-danger" @click.prevent="onDeleteHobby(hobbyInput.id)" type="button">X</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <input type="checkbox" id="terms" v-model="terms">
            <label for="terms">Accept Terms of Use <span v-if="isIndia"> *(optional)</span></label>
            <button class="btn btn-primary pull-right"  type="submit">Submit</button><br>
            <span v-if="$v.terms.$invalid && $v.terms.$dirty" class="text-danger">Please accept terms of use.</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, numeric, minValue, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators';
  
  export default {
    data () {
      return {
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'uk',
        hobbyInputs: [],
        terms: false
      }
    },
    validations: {
      email: {
        required,
        email
      },
      age: {
        required,
        numeric,
        minValue: minValue(18)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      },
      terms: {
        required: requiredUnless(vm => {
          return this.isIndia;
        })
      }
    },
    computed: {
      isIndia() {
        return this.country === 'india';
      }
    },
    methods: {
      onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },
      onSubmit () {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          const formData = {
            email: this.email,
            age: this.age,
            password: this.password,
            confirmPassword: this.confirmPassword,
            country: this.country,
            hobbies: this.hobbyInputs.map(hobby => hobby.value).filter(hobby => hobby.value.length > 0),
            terms: this.terms
          };
          this.$store.dispatch('signUpUser', formData)
            .then(res => router.replace('/dashboard'));
        }
        else {
          console.log(this.$v);
        }
      }
    }
  }
</script>

<style>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

</style>