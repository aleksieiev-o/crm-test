<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
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
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ 'sign_in' | locale }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'is_not_have_account' | locale }}
        <router-link to="/register">
          {{ 'sign_up' | locale }}
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import notification from '../helpers/notificationText'
import localeFilter from '../helpers/filters/localeFilter'

export default {
  name: 'AuthAuthorization',
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  mounted() {
    if (notification[this.$route.query.message]) {
      this.$message(localeFilter(notification[this.$route.query.message]))
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        })
        await this.$router.push('/')
      } catch (e) {}
    },
  },
  data: () => ({
    email: '',
    password: '',
  }),
}
</script>
