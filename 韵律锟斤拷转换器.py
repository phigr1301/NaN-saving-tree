b=input("源码")
print(b.encode('utf-8').decode('gbk'))
b=input("乱码")
print(b.encode('gbk').decode('utf-8'))
