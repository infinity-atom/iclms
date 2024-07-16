<template>
    <v-app>
        <v-navigation-drawer temporary v-model="drawer" @click="drawer = false">
            <v-list-item href="#" prepend-icon="mdi-help-circle">
                icLMS
            </v-list-item>
            <v-list-item href="#link-downloads" prepend-icon="mdi-download">
                Downloads
            </v-list-item>
            <v-list-item href="#link-contribute" prepend-icon="mdi-source-branch">
                Contribute
            </v-list-item>
            <v-list-item href="#link-license" prepend-icon="mdi-file-document">
                License
            </v-list-item>
            <v-list-item href="#link-credits" prepend-icon="mdi-account-group">
                Credits
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item href="https://github.com/infinity-atom/iclms" prepend-icon="mdi-git">
                GitHub Repository
            </v-list-item>
        </v-navigation-drawer>

        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title>
                icLMS
            </v-app-bar-title>
        </v-app-bar>

        <v-main>
            <div width="100%" class="d-flex align-center flex-column pa-5 mb-5">
                <img src="@/assets/logo.png" alt="icLMS Logo" style="width: 5%; min-width: 250px;">
                <h1>icLMS</h1>
                <span><b>(Improved Canvas LMS)</b></span>
                <p class="mt-5">
                    icLMS is a free and open-source Canvas LMS client that aims to improve the user experience of the original Canvas LMS, using the official Canvas LMS REST API.
                </p>
            </div>
            <div class="pa-5">
                <v-card title="Downloads" id="link-downloads">
                    <v-card-text>
                        Downloads are available on the Releases tab on the GitHub repository.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn href="https://github.com/infinity-atom/iclms/releases" target="_blank" color="primary" append-icon="mdi-open-in-new">GitHub Releases</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
            <v-divider></v-divider>
            <div class="pa-5">
                <v-card title="Contribute" id="link-contribute">
                    <v-card-text>
                        <p>
                            You can contribute to the project from GitHub, by forking the repository and creating a pull request.
                            If you are a regular user, you can also contribute by reporting bugs and suggesting new features.
                        </p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn href="https://github.com/infinity-atom/iclms" target="_blank" color="primary" append-icon="mdi-open-in-new">GitHub Repository</v-btn>
                    </v-card-actions>
                </v-card>
                <br>
                <v-card title="License" id="link-license">
                    <v-card-text>
                        <p>
                            icLMS is licensed under the MIT license. You can use, modify, and distribute the software as long as you include the original license and copyright.
                        </p>
                        <br>
                        <p>
                            Copyright &copy; 2024 infinity-atom
                            <br><br>
                            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                            <br><br>
                            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                            <br><br>
                            THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                        </p>
                    </v-card-text>
                </v-card>
                <br>
                <v-card title="Credits" id="link-credits">
                    <v-card-text>
                        The following libraries were used to create icLMS
                        <v-list>
                            <v-list-item title="Vue.js" subtitle="MIT License - Copyright &copy; 2013-present, Yuxi (Evan) You"></v-list-item>
                            <v-list-item title="Vuetify" subtitle="MIT License - Copyright &copy; 2016-2023 John Jeremy Leider"></v-list-item>
                            <v-list-item title="Electron" subtitle="MIT License - Copyright &copy; Electron contributors and 2013-2020 GitHub Inc."></v-list-item>
                            <v-list-item title="electron-builder" subtitle="MIT License - Copyright &copy; 2015 Loopline Systems"></v-list-item>
                            <v-list-item title="Material Design Icons" subtitle="Apache License 2.0"></v-list-item>
                            <v-list-item title="Marked" subtitle="MIT License - Copyright &copy; 2018+ MarkedJS, Copyright &copy; 2011-2018 Christopher Jeffrey"></v-list-item>
                            <v-list-item title="Canvas LMS Rest API" subtitle="Provided by Instructure Inc."></v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
                <br>
            </div>
            <v-divider></v-divider>
            <div class="pa-5 text-center">
                Copyright &copy; 2024 infinity-atom
            </div>
        </v-main>
    </v-app>
</template>

<style>
* {
    scroll-behavior: smooth;
}
</style>

<script setup>
    import { ref } from 'vue';

    const drawer = ref(false);
    const tabs = ref("Windows");

    const builds = {windows:[],macos:[],linux:[]};
</script>