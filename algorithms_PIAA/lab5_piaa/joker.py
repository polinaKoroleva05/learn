from operator import itemgetter

def num(char):
    alphabet = ['A', 'C', 'G', 'T', 'N']
    return alphabet.index(char)

class Node:
    def __init__(self, id, count, parent, pchar):
        self.id = id
        self.next = [None] * count
        self.is_terminal = False
        self.parent = parent
        self.pchar = pchar
        self.sufflink = None
        self.good_link = None
        self.go = [None] * count

    def descript(self):
        print("Индекс вершины:", self.id)
        print("Символ ребра, приводящего в эту вершину:", self.pchar)
        print("Конечна ли вершина:", self.is_terminal)
        print("Вершины, выходящие из данной:", [elem.pchar for elem in self.next if elem])
        print()
        for child in self.next:
            if child:
                child.descript()

class Bor:
    def __init__(self, count):
        self.count = count
        self.nodes = [Node([0], count, None, None)]
        self.root = self.nodes[0]

    def add(self, s, id):
        print("Добавление подстроки", s)
        v = self.root
        for char in s:
            if not v.next[num(char)]:
                print("Буквы", char, "в боре еще нет, создаем новую вершину")
                self.nodes.append(Node([id], self.count, v, char))
                v.next[num(char)] = self.nodes[-1]
            v = v.next[num(char)]
            print("Переходим в следующую вершину по ребру", v.pchar)

        print("Добавим в список индексов этой вершины номер добавленной подстроки", id)
        if v.is_terminal:
            v.id.append(id)
        else:
            v.id = [id]
        print("Установим флаг терминальности вершины")
        v.is_terminal = True

    def find(self, s):
        v = self.root
        for char in s:
            if not v.next[num(char)]:
                return False
            v = v.next[num(char)]
        return v.is_terminal

    def get_link(self, node):
        if not node.sufflink:
            if node == self.root or node.parent == self.root:
                print("Так как вершина или ее родитель - корень, ссылкой является корень")
                node.sufflink = self.root
            else:
                print("Запускаем поиск ссылки из родителя вершины")
                node.sufflink = self.go(self.get_link(node.parent), node.pchar)
        return node.sufflink

    def go(self, node, char):
        print("Запущена функция перехода из вершины", node.pchar, "по ребру", char)
        if not node.go[num(char)]:
            if node.next[num(char)]:
                node.go[num(char)] = node.next[num(char)]
                print("В боре есть нужное ребро")
            elif node == self.root:
                node.go[num(char)] = self.root
                print("Ребра нет, поскольку вершина является корнем, идем снова в корень")
            else:
                print("Ребра нет, перейдем по ссылке")
                node.go[num(char)] = self.go(self.get_link(node), char)
                print("Cохраняем переход в массив go вершины", node.pchar, "для дальнейшего использования")
        return node.go[num(char)]

    def get_good_link(self, node):
        if not node.good_link:
            tmp_node = self.get_link(node)
            if tmp_node == self.root:
                node.good_link = self.root
            else:
                if tmp_node.is_terminal:
                    node.good_link = tmp_node
                else:
                    node.good_link = self.get_good_link(tmp_node)
        return node.good_link

    def description(self):
        print("\nОписание построенного бора\n")
        print("Количество вершин в боре", len(self.nodes))
        self.root.descript()


count = 5
text = input()
pattern = input()
joker = input()
exc = input()

l = []
words = ['']
i = 0
C = [0 for elem in text]
for idx, char in enumerate(pattern):
    if char != joker:
        if words[-1] == '':
            l.append(idx+1)
        words[-1] += char
    if char == joker:
        words.append('')

words = [elem for elem in words if elem != '']
print("Подстроки, разделенные джокером:", words)
print("Их стартовые позиции:", l)
print("\nПостроение бора")
t = Bor(count)
for idx, word in enumerate(words):
    t.add(word, idx)

t.description()

node = t.root
for i in range(len(text)):
    print("\nПередаем в автомат символ", text[i])
    node = t.go(node, text[i])
    tmp = node
    while tmp != t.root:
        if tmp.is_terminal:
            print("Пришли в терминальную вершину с порядковым номером подстроки (начиная с 1)", [i+1 for i in tmp.id])
            for n in tmp.id:
                idx = i - l[n] + 2 - len(words[n])
                print("Увеличиваем массив С по индексу", i, "-", l[n], "+", 2, "-", len(words[n]), "=", idx)
                if idx >= 0:
                    C[idx] += 1
            print("Массив С на данном шаге:",C)
        print("Запускаем поиск хороших ссылок, чтобы найти все подстроки для этой позиции")
        tmp = t.get_good_link(tmp)
        print("Пришли в вершину: ", tmp.pchar)
res = []
print("\nПолучен массив С:", C, "\nЭлементы массива равные кол-ву искомых подстрок - претенденты начала искомого шаблона")
for i in range(len(C)):
    if C[i] == len(words):
        try:
            C[i+len(pattern) - 1]
            is_right = 1
            applicant = text[i:i+len(pattern)]
            print("Претендент:", applicant)
            for idx, char in enumerate(pattern):
                if char == joker and applicant[idx] == exc:
                    print("На месте джокера встречен запрещенный символ")
                    is_right = 0
                    break
            if is_right:
                print("Запрещенный символ не встречен => записываем ответ")
                res.append(i + 1)
        except Exception:
            break
for i in res:
    print(i)