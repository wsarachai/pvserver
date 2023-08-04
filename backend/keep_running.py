#!/home/keng/anaconda3/bin/python
from psutil import Process
from subprocess import call, run, PIPE


def findPID(cmd):
    cmd = "ps aux|grep '{}'|grep -v grep |awk '{{print $2}}'".format(cmd)
    result = run(cmd, stdout=PIPE, shell=True)
    try:
        pid = int(result.stdout.rstrip())
    except:
        pid = -1
    return pid


def startApp(cmd):
    call("nohup {} >/dev/null 2>&1 &".format(cmd), shell=True)


def main():
    cmd = "node app/app.js"
    pid = findPID(cmd=cmd)
    if pid < 0:
        startApp(cmd)

    pid = findPID(cmd=cmd)
    if pid > 0:
        with open("app.pid", "w") as file:
            file.write(str(pid))

    with open("/home/keng/Documents/workspace/pvserver/count.txt", "r") as file:
        try:
            c = int(file.readline())
        except:
            c = 1
    with open("/home/keng/Documents/workspace/pvserver/count.txt", "w") as file:
        c = c + 1
        file.write(str(c))


if __name__ == "__main__":
    main()

