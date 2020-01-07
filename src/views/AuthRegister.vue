<template>
  <form class="card auth-card" @submit.prevent="onRegister">
    <div class="card-content">
      <span class="card-title">CRM</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ 'invalid': ($v.email.$dirty && !$v.email.required)
              || ($v.email.$dirty && !$v.email.email) }">
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid">
          {{ 'required_field' | locale }}
        </small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid">
          {{ 'input_email_validate' | locale }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="password"
          :class="{ 'invalid': ($v.password.$dirty && !$v.password.required)
            || ($v.password.$dirty && $v.password.minLength < 6) }">
        <label for="password">{{ 'password' | locale }}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid">
          {{ 'required_field' | locale }}
        </small>
        <small
          v-else-if="$v.password.$dirty && $v.password.minLength < 6"
          class="helper-text invalid">
          {{ 'input_password_validate' | locale }} {{ $v.password.$params.minLength.min }} символов
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
        >
        <label for="name">{{ 'input_name' | locale }}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid">
          {{ 'required_field' | locale }}
        </small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="agree"/>
          <span>{{ 'rules_input' | locale }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ 'sign_up' | locale }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'is_have_account' | locale }}
        <router-link to="/login">{{ 'sign_in' | locale }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AuthRegister',
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v },
  },
  methods: {
    async onRegister() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('register', {
          email: this.email,
          password: this.password,
          name: this.name,
        })
        await this.$router.push('/')
      } catch (e) {}
    },
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
}
</script>
