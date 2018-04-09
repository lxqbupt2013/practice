# coding=utf-8

"""

第 0000 题：将你的 QQ 头像（或者微博头像）右上角加上数字，类似于微信未读信息数量那种提示效果

"""

from PIL import Image, ImageFont, ImageDraw
import random


num = random.randint(1, 10)

image = Image.open('me.jpg')
w,h = image.size
font = ImageFont.truetype('/Library/Fonts/Arial.ttf', 60)

draw = ImageDraw.Draw(image)
draw.text((4*w/5, h/6), str(num), fill=(142, 229, 238), font=font)
image.save('me.0.png', 'png')
