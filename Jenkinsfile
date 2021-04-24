pipeline {

  agent any

  tools {
    nodejs "NodeJS15.8.0"
  }

  triggers {
    upstream(upstreamProjects: "Docker Common/Docker Build Node", threshold: hudson.model.Result.SUCCESS)
  }

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr:'10'))
    disableConcurrentBuilds()
    disableResume()
  }

  parameters {
    string(name: 'NAMESPACE', defaultValue: 'default', description: 'Kubernetes default namespace')
    string(name: 'IS_DEV', defaultValue: 'false', description: 'If true, then the application is deployed in the dev cluster (playground).')
  }

  environment {
    SCM_URL = "${env.GIT_URL}"
    SCM_BRANCH = "${env.BRANCH_NAME}"
    SCM_GIT_COMMIT = "${env.GIT_COMMIT}"
    SCM_APP_NAME = getProjectName()
    SCM_CREDENTIALS_ID = "fe1083c2-6b4d-425f-b36c-b3691e99e3eb"
    CURRENT_DATE = new Date().format("yy-MM-dd'T'HH:mm:ss", TimeZone.getTimeZone('UTC'))
    IMAGE_NAME = "runtime/cx/${SCM_APP_NAME}"
    REGISTRY_COMMON = "internal-development-docker-common.techstack.ch"
    REGISTRY_CREDENTIAL = 'credentials-docker-registry'
    NPM_TOKEN = credentials('node-registry-token')
    NPM_CONFIG_REGISTRY = "https://nexus.techstack.ch/repository/group_development_npm/"
    DOCKER_HOST = "tcp://127.0.0.1:2376"
    EMAIL_RECIPIENTS = "thoschulte@gmail.com"
    KUBERNETES_CONFIG_ID = "k8s-cx-playground"
    KUBERNETES_ENVIRONMENT_CONFIG_AVAILABLE = fileExists './kubernetes/config/'
    BUILD_DIR = "."
    HELM_INSTALL_URL = "https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3"
    HELM_REGISTRY = "https://nexus.techstack.ch/repository/public_cx_helm_charts/"
    ENVIRONMENT = "${env.IS_DEV == 'true' ? 'playground' : env.BRANCH_NAME}"
    DOMAIN_DEV = "ingress1.dev-lbobka.de-1.mk.psmanaged.com"
    DOMAIN_TEST = ""
    DOMAIN_STAGING = ""
    DOMAIN_LIVE = ""
  }

  stages {
    stage("Infos and preparations") {
      steps {
        echo "https://riptutorial.com/Download/groovy.pdf"
        echo "Appname: ${env.SCM_APP_NAME}"
        echo "Branch: ${env.SCM_BRANCH}"
        echo "Git Commit: ${env.SCM_GIT_COMMIT}"
        echo sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
        echo "Node: ${env.NODE_NAME}"
        echo "Environment: ${getEnvironment()}"
        echo "IsDev: ${env.IS_DEV}"

        sh('printenv | sort')

        script {
          def icon = "📍"
          def helmLocation = '/usr/local/bin/helm'
          def helm3 = sh(returnStdout: true, script: 'which helm').trim()

          if (helm3 == helmLocation) {
            echo helm3

//            dir(env.BUILD_DIR) {
//              echo env.REGISTRY_CREDENTIAL
//              echo env.HELM_CONFIG_REGISTRY
//              withCredentials([usernameColonPassword(credentialsId: env.REGISTRY_CREDENTIAL, variable: 'REGISTRY_CREDENTIAL_HELM')]) {
//                def cmd = "helm repo add nexus https://${REGISTRY_CREDENTIAL_HELM}@nexus.techstack.ch/repository/public_cx_helm_charts/"
//                echo sh(returnStdout: true, script: cmd).trim()
//                echo sh(returnStdout: true, script: 'helm version').trim()
//                helm env
//                helm ls --kubeconfig ${KUBECONFIG_CONTENT}
//              }
//            }
          } else {
            sh 'curl -fsSL -o get_helm.sh ${env.HELM_INSTALL_URL}'
            sh 'chmod 700 get_helm.sh'
            sh './get_helm.sh'
          }

          currentBuild.displayName = "Build: ${env.BUILD_NUMBER}"

          if(env.IS_DEV == 'true') {
            currentBuild.description = "${icon}${env.JOB_NAME} (playground) ⚠️\n${icon}${getProjectVersion()} ➜ ${sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()}"
          } else {
            currentBuild.description = "${icon}${env.JOB_NAME}\n${icon}${getProjectVersion()} ➜ ${sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()}"
          }
        }
      }
    }

    stage("Install app dependencies") {
      steps {
        script {
          if (BRANCH_NAME == 'develop' || BRANCH_NAME == 'release') {
            // sh "npm ci --loglevel verbose"
            // sh "npm ci"
            sh "npm run version"
          } else {
            sh "npm ci --only=production"
          }
        }
      }
    }

    stage("Unittests") {
      when {
        expression {
          BRANCH_NAME == 'develop' || BRANCH_NAME == 'release'
        }
      }

      steps {
        script {
          sh 'npm test'
        }
      }
    }

    stage("Build app") {
      when {
        expression {
          BRANCH_NAME == 'develop' || BRANCH_NAME == 'release' || BRANCH_NAME == 'master'
        }
      }

      steps {
        script {
          // sh 'npm run build'
          echo 'ToDo'
        }
      }
    }

    stage("Intregrationtests") {
      when {
        expression {
          BRANCH_NAME == 'develop' || BRANCH_NAME == 'release' || BRANCH_NAME == 'master'
        }
      }

      steps {
        script {
          // sh 'npm e2e'
          echo 'ToDo'
        }
      }
    }

    stage("Build container image") {
      steps {
        script {
          if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'release' || env.BRANCH_NAME == 'master') {
            def gitCommit = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
            def labelBuildArg = "--no-cache " +
              "-f ./docker/Dockerfile " +
              "--label \"${IMAGE_NAME}.create.date=${CURRENT_DATE}\" " +
              "--label \"${IMAGE_NAME}.create.build=${env.BUILD_URL}\" " +
              "--label \"${IMAGE_NAME}.create.buildno=${env.BUILD_NUMBER}\" " +
              "--label \"${IMAGE_NAME}.repository.commit=${gitCommit}\" " +
              "--label \"${IMAGE_NAME}.repository.url=${SCM_URL}\" " +
              "--label \"${IMAGE_NAME}.repository.branch=${SCM_BRANCH}\" " +
              "--build-arg=http_proxy " +
              "--build-arg=https_proxy " +
              "--build-arg=ENVIRONMENT " +
              "--build-arg=NPM_TOKEN " +
              "--build-arg=NPM_CONFIG_REGISTRY " +
              "."

            echo labelBuildArg

            dir(env.BUILD_DIR) {
              docker.withRegistry("https://${env.REGISTRY_COMMON}", env.REGISTRY_CREDENTIAL) {
                containerImage = docker.build(env.IMAGE_NAME + ":latest", labelBuildArg)
              }
            }
          }
        }
      }
    }

    stage("Push container image") {
      steps {
        script {
          def registry = "internal-development-docker-${getEnvironment()}.techstack.ch"
          def imageId = sh(returnStdout: true, script: "docker images --filter=reference=${env.IMAGE_NAME + ":latest"} --format \"{{.ID}}\"").trim().substring(0, 7)

          env.IMAGE_TAG = "${getProjectVersion()}-${imageId.substring(0, 7)}"

          echo env.IMAGE_TAG

          docker.withRegistry("https://${registry}", env.REGISTRY_CREDENTIAL) {
            def baseImage = docker.image(env.IMAGE_NAME + ":latest")

            baseImage.tag("latest")
            baseImage.push("latest")
            baseImage.tag(env.IMAGE_TAG)
            baseImage.push(env.IMAGE_TAG)
          }
        }
      }
    }

    stage("Delete local container image") {
      steps {
        script {
          def registry = "internal-development-docker-${getEnvironment()}.techstack.ch"

          sh "docker image rm ${env.IMAGE_NAME}:latest"
          sh "docker image rm ${registry}/${env.IMAGE_NAME}:latest"
          sh "docker image rm ${registry}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"
        }
      }
    }

    stage("Deploy environment specific configs to Kubernetes") {
      when {
        expression {
          env.KUBERNETES_ENVIRONMENT_CONFIG_AVAILABLE == 'true'
        }
      }

      steps {
        script {
          dir(env.BUILD_DIR) {
            withCredentials([kubeconfigFile(credentialsId: env.KUBERNETES_CONFIG_ID, variable: 'KUBECONFIG_FILE')]) {
              def configPath = "kubernetes/config/${getEnvironment()}"
              def cmd = "kubectl apply --kubeconfig ${KUBECONFIG_FILE} -f ${configPath}"
              echo sh(returnStdout: true, script: cmd).trim()
            }
          }
        }
      }
    }

    stage("Deploy common configs to Kubernetes") {
      steps {
        script {
          dir(env.BUILD_DIR) {
            withCredentials([kubeconfigFile(credentialsId: env.KUBERNETES_CONFIG_ID, variable: 'KUBECONFIG_FILE')]) {
              def registry = "internal-development-docker-${getEnvironment()}.techstack.ch"
              def cmdNamespace = "kubectl --kubeconfig ${KUBECONFIG_FILE} get ns ${params.NAMESPACE} || kubectl --kubeconfig ${KUBECONFIG_FILE} create ns ${params.NAMESPACE}"
              echo sh(returnStdout: true, script: cmdNamespace).trim()

              def data = readFile(file: 'kubernetes/templates/deployment.tmpl.yaml')
              data = data.replace('${NAMESPACE}', "${params.NAMESPACE}")
              data = data.replace('${REGISTRY}', registry)
              data = data.replace('${IMAGE_TAG}', env.IMAGE_TAG)
              data = data.replace('${PROJECT_NAME}', getProjectName())
              echo data
              def deploymentPath = 'kubernetes/deployment.yaml'
              writeFile(file: deploymentPath, text: data)
              def cmdDeployment = "kubectl apply --kubeconfig ${KUBECONFIG_FILE} -f ${deploymentPath}"
              echo sh(returnStdout: true, script: cmdDeployment).trim()

              data = readFile(file: 'kubernetes/templates/service.tmpl.yaml')
              data = data.replace('${NAMESPACE}', "${params.NAMESPACE}")
              data = data.replace('${PROJECT_NAME}', getProjectName())
              echo data
              def servicePath = 'kubernetes/service.yaml'
              writeFile(file: servicePath, text: data)
              def cmdService = "kubectl apply --kubeconfig ${KUBECONFIG_FILE} -f ${servicePath}"
              echo sh(returnStdout: true, script: cmdService).trim()

              data = readFile(file: 'kubernetes/templates/ingress.tmpl.yaml')
              data = data.replace('${NAMESPACE}', "${params.NAMESPACE}")
              data = data.replace('${PROJECT_NAME}', getProjectName())
              echo data
              def ingressPath = 'kubernetes/ingress.yaml'
              writeFile(file: ingressPath, text: data)
              def cmdIngress = "kubectl apply --kubeconfig ${KUBECONFIG_FILE} -f ${ingressPath}"
              echo sh(returnStdout: true, script: cmdIngress).trim()
            }
          }
        }
      }
    }

    stage('Helm') {
      agent {
        docker {
          image 'dtzar/helm-kubectl'
          args "-v ${env.BUILD_DIR}"
          args "-e HELM_CONFIG_REGISTRY=${env.HELM_CONFIG_REGISTRY}"
        }
      }

      steps {
        script {
          dir(env.BUILD_DIR) {
            withCredentials([kubeconfigFile(credentialsId: env.KUBERNETES_CONFIG_ID, variable: 'KUBECONFIG_FILE')]) {
              sh '''
                kubectl --kubeconfig ${KUBECONFIG_FILE} config view
                helm version
                helm env
                helm ls --kubeconfig ${KUBECONFIG_FILE}
                echo ${HELM_CONFIG_REGISTRY}
                ls -ahl
              '''
            }
          }
        }
      }
    }

    stage("Git tag and push") {
      steps {
        script {
          // def lastGitCommit = currentBuild.previousBuild.buildVariables.LAST_GIT_COMMIT

          sh("""
            git config user.name 'jenkins'
            git config user.email 'thoschulte@gmail.com'
            git tag -a ${getTag()} -m "${env.CURRENT_DATE} [Jenkins CI] Build-URL: ${env.JOB_URL}"
          """)

          sshagent([env.SCM_CREDENTIALS_ID]) {
            sh("""
              #!/usr/bin/env bash
              set +x
              export GIT_SSH_COMMAND="ssh -oStrictHostKeyChecking=no"
              git push origin ${getTag()}
            """)
          }
        }
      }
    }

    stage("Done") {
      steps {
        script {
          env.LAST_GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
        }
      }
    }
  }

  post {
    always {
      step([
        $class: 'Mailer',
        recipients: env.EMAIL_RECIPIENTS,
        notifyEveryUnstableBuild: true,
        sendToIndividuals: true
      ])
    }
  }
}

def readJson() {
  return readJSON(file: 'package.json')
}

def getProjectName() {
  def packageJSON = readJson()
  def packageJSONName = packageJSON.name
  return packageJSONName
}

def getProjectVersion() {
  def packageJSON = readJson()
  def packageJSONVersion = packageJSON.version
  return packageJSONVersion
}

def getEnvironment() {
  def returnValue = ''

  switch("${env.SCM_BRANCH}") {
    case 'master':
      returnValue = 'live'
      break
    case 'release':
      returnValue = 'staging'
      break
    case 'develop':
      returnValue = 'test'
      break
    default:
      returnValue = 'development'
      break
  }

  return returnValue
}

def getTag() {
  def tag = "";

  if (env.BRANCH_NAME == 'develop') {
    tag = "v${getProjectVersion()}-alpha+${env.BUILD_NUMBER}"
  } else if (env.BRANCH_NAME == 'release') {
    tag = "v${getProjectVersion()}-rc+${env.BUILD_NUMBER}"
  } else if (env.BRANCH_NAME == 'master') {
    tag = "v${getProjectVersion()}-${env.BUILD_NUMBER}"
  } else {
    tag = "v${getProjectVersion()}"
  }

  return tag
}

def getEnvironmentCredentials() {
  def returnArr = [:]

  switch ("${env.IS_DEV == 'true' ? 'dev' : getEnvironment()}") {
    case 'test':
      returnArr['domain'] = "iam-test.ingress1.4048161.de-3.mk.techstack.ch"
      returnArr['kubeConfigId'] = "${env.KUBERNETES_CONFIG_ID_TEST}"
      break
    case 'staging':
      returnArr['domain'] = "iam-test.ingress1.4048161.de-3.mk.techstack.ch"   // ToDo: 'iam-staging.ingress1.4048161.de-3.mk.techstack.ch'
      returnArr['kubeConfigId'] = "${env.KUBERNETES_CONFIG_ID_TEST}"            // ToDo: "${env.KUBERNETES_CONFIG_ID_RELEASE}"
      break
    case 'live':
      returnArr['domain'] = "iam-test.ingress1.4048161.de-3.mk.techstack.ch"   // ToDo: 'iam.ingress1.4048161.de-3.mk.techstack.ch'
      returnArr['kubeConfigId'] = "${env.KUBERNETES_CONFIG_ID_TEST}"            // ToDo: "${env.KUBERNETES_CONFIG_ID_LIVE}"
      break
    default:
      returnArr['domain'] = "iam-dev.ingress1.dev-lbobka.de-1.mk.psmanaged.com"
      returnArr['kubeConfigId'] = "${env.KUBERNETES_CONFIG_ID_DEV}"
  }

  return returnArr
}
